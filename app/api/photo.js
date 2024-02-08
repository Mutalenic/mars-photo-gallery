// pages/api/photos.js
export default async function handler(req, res) {
  const { rover, sol, camera, earth_date } = req.query;
  const apiKey = process.env.NASA_API_KEY;
  const baseUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

  try {
    const url = new URL(baseUrl);
    url.searchParams.append("api_key", apiKey);
    if (sol) url.searchParams.append("sol", sol);
    if (camera) url.searchParams.append("camera", camera);
    if (earth_date) url.searchParams.append("earth_date", earth_date);

    const response = await fetch(url.toString());
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching photos' });
  }
}
