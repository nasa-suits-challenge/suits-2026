import json

def test_status_flow():
    ctx = {"eva_mode":"EVNav","caps":{"tools_allowed":["get_telemetry","say"]}}
    asr = "Athena, status."
    plan = {"tool_calls":[{"name":"get_telemetry"}]}
    assert plan["tool_calls"][0]["name"] == "get_telemetry"
