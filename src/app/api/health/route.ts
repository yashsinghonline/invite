// Static uptime ping used by the hosting platform. No backend, no database.
export const dynamic = "force-static";

export function GET() {
  return Response.json({ ok: true, site: "vijay-rashmika-wedding-invitation", static: true });
}
