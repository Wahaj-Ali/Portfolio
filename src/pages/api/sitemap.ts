import type { NextApiRequest, NextApiResponse } from "next";
import { generateSitemapXml } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/site";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = getSiteOrigin(
    req.headers.host ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}` : undefined
  );

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(generateSitemapXml(origin));
}
