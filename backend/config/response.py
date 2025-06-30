from rest_framework.response import Response


def success_response(data=None, status=200):
    return Response({"status": "success", "data": data}, status=status)


def fail_response(message, errors=None, status=400):
    payload = {"status": "fail", "message": message, "errors": errors or []}
    return Response(payload, status=status)


def error_response(message, status=500):
    return Response({"status": "error", "message": message, "data": None}, status=status)
