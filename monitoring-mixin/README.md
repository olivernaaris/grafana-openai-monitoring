# OpenAI Monitoring Mixin

The OpenAI mixin is a set of configurable Grafana dashboards and alerts.

The OpenAI mixin contains the following dashboards:

- OpenAI

and the following alerts:

- HighCompletionTokensUsage
- HighPromptTokensUsage
- HighTotalTokensUsage
- LongRequestDuration
- HighUsageCost

## OpenAI Monitoring Dashboard Overview
OpenAI Monitoring dashbaord provides details on the overall status of the OpenAI Usage including the average cost and model usage. The dashboard includes visualizations to track average requests duration along with token usage.

#TODO screenshots

## Alerts Overview
- HighCompletionTokensUsage: Alert for high completion tokens usage.
- HighPromptTokensUsage: Alert for high prompt tokens usage.
- HighTotalTokensUsage: Alert for high total tokens usage.
- LongRequestDuration: Alert for long request duration.
- HighUsageCost: Alert for high usage cost

## Tools
To use them, you need to have `mixtool` and `jsonnetfmt` installed. If you have a working Go development environment, it's easiest to run the following:

```bash
$ go get github.com/monitoring-mixins/mixtool/cmd/mixtool
$ go get github.com/google/go-jsonnet/cmd/jsonnetfmt
```

You can then build a directory `dashboard_out` with the JSON dashboard files for Grafana:

```bash
$ make build
```

For more advanced uses of mixins, see [Prometheus Monitoring Mixins docs](https://github.com/monitoring-mixins/docs).
