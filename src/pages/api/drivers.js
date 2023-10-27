// pages/api/drivers.js
import { supabase } from "../../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("Drivers").select("*");

      if (error) throw error;

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
