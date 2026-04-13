import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { name, email, message, page } = await request.json();

      const resend = new Resend(env.RESEND_API_KEY);

      const result = await resend.emails.send({
        from: "Web Personal <contacto@paicai.com.co>",
        to: ["hmauricio.pineda@gmail.com"],
        subject: `[${page || "Web"}] Nuevo mensaje de ${name}`,
        html: `
          <h2>Nuevo mensaje desde mauriciopineda.com</h2>
          <p><strong>De:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong> Página:</strong> ${page || "General"}</p>
          <hr>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
        reply_to: email,
      });

      return Response.json({ success: true, data: result }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500, headers: {
        "Access-Control-Allow-Origin": "*",
      } });
    }
  },
} satisfies ExportedHandler<Env>;