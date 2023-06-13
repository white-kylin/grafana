package definitions

// AlertingFileExport is the full provisioned file export.
// swagger:model
type AlertingFileExport struct {
	APIVersion int64                      `json:"apiVersion" yaml:"apiVersion"`
	Groups     []AlertRuleGroupExport     `json:"groups,omitempty" yaml:"groups,omitempty"`
	Policies   []NotificationPolicyExport `json:"policies,omitempty" yaml:"policies,omitempty"`
}
