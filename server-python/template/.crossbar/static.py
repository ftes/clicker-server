from crossbar.twisted.resource import StaticResource


class StaticCorsResource(StaticResource):
    def render_GET(self, request):
        request.setHeader(b'Access-Control-Allow-Origin', b'*')
        request.setHeader(b'Access-Control-Allow-Headers',
                        b'Origin, X-Requested-With, Content-Type, Accept')

        return StaticResource.render_GET(self, request)
