import os
import sys
import socket
import http.server

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DualStackThreadingServer(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6

    def server_bind(self):
        # Allow dual-stack (both IPv4 and IPv6)
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception:
            pass
        return super().server_bind()

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Prevent aggressive browser caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Print concise request log
        sys.stdout.write(f"[{self.log_date_time_string()}] {args[0]} {args[1]}\n")
        sys.stdout.flush()

if __name__ == '__main__':
    DualStackThreadingServer.allow_reuse_address = True
    try:
        httpd = DualStackThreadingServer(('::', PORT), Handler)
        print(f"Dual-stack server running at http://localhost:{PORT} and http://127.0.0.1:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
    except Exception as e:
        # Fallback to IPv4 only if IPv6 is not available
        print(f"Falling back to IPv4: {e}")
        httpd = http.server.ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
        print(f"IPv4 server running at http://127.0.0.1:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
