import { offsetLaunchDate } from "@/helpers/formatter";

interface LaunchManifest {
  id: string;
  mission_name: string;
  launch_date_utc: Date;
  done: boolean;
  next: boolean;
  links: {
    video_link: string;
    wikipedia: string;
  };
}

async function fetchLaunchManifest(offset: number): Promise<LaunchManifest[]> {
  try {
    const launchManifestResponse = await fetch(
      "https://spacex-production.up.railway.app/graphql",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query FetchLaunchManifest($order: String, $limit: Int, $offset: Int) {
            launches(order: $order, limit: $limit, offset: $offset) {
              id
              mission_name
              launch_date_utc
              links {
                video_link
                wikipedia
              }
            }
          }
        `,
          variables: { order: "launch_date_utc", limit: 10, offset },
        }),
      }
    );

    if (launchManifestResponse.status >= 400) {
      throw new Error("Error fetching launch data");
    }

    return offsetLaunchDate(
      (await launchManifestResponse.json()).data.launches
    );
  } catch {
    return [];
  }
}

export { fetchLaunchManifest };
export type { LaunchManifest };
