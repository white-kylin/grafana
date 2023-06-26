package requestmeta

import (
	"context"
	"net/http"

	contextmodel "github.com/grafana/grafana/pkg/services/contexthandler/model"
	"github.com/grafana/grafana/pkg/web"
)

const (
	TeamAlerting = "alerting"
	TeamAuth     = "auth"
	TeamCore     = "core"
)

type rMDContextKey struct{}

type RequestMetaData struct {
	Team string
}

var requestMetaDataContextKey = rMDContextKey{}

// GetRequestMetaData returns the request metadata for the context.
// if request metadata is missing it will return the default values.
func GetRequestMetaData(ctx context.Context) *RequestMetaData {
	val := ctx.Value(requestMetaDataContextKey)

	value, ok := val.(*RequestMetaData)
	if ok {
		return value
	}

	return defaultRequestMetadata()
}

// SetRequestMetaData returns an `web.Handler` that overrides the request metadata
// with the provided param.
func SetRequestMetaData(rmd RequestMetaData) web.Handler {
	return func(c *contextmodel.ReqContext) {
		v := GetRequestMetaData(c.Req.Context())
		if rmd.Team != "" {
			v.Team = rmd.Team
		}
	}
}

// SetOwner returns an `web.Handler` that sets the team name for an request.
func SetOwner(team string) web.Handler {
	return func(c *contextmodel.ReqContext) {
		v := GetRequestMetaData(c.Req.Context())
		v.Team = team
	}
}

func defaultRequestMetadata() *RequestMetaData {
	return &RequestMetaData{
		Team: TeamCore,
	}
}

func Middleware() web.Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			rmd := defaultRequestMetadata()

			ctx := context.WithValue(r.Context(), requestMetaDataContextKey, rmd)
			r = r.WithContext(ctx)

			next.ServeHTTP(w, r)
		})
	}
}
