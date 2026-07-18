import type { NextApiRequest, NextApiResponse } from "next";
import { generateRobotsTxt } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/site";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = getSiteOrigin(
    req.headers.host ? `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}` : undefined
  );

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(generateRobotsTxt(origin));
}
