
import { useEffect, useState } from "react";

type AstronomyData = {
  sunrise: string;
  sunset: string;
  moon_phase: string;
};

export function useVisualization(visual: string, date: string) {
  const [data, setData] = useState<AstronomyData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAstronomyData = async () => {
      if (visual !== "estelar" || !date) {
        setData(null);
        return;
      }

      setLoading(true);

      try {
        // Open Meteo API: ejemplo para Buenos Aires (coords pueden parametrizarse)
        const lat = -34.6037;
        const lon = -58.3816;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset,moon_phase&timezone=auto`
        );
        const json = await response.json();
        const today = json.daily;

        setData({
          sunrise: today.sunrise[0],
          sunset: today.sunset[0],
          moon_phase: today.moon_phase[0],
        });
      } catch (err) {
        console.error("Error fetching astronomy data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronomyData();
  }, [visual, date]);

  return { data, loading };
}
