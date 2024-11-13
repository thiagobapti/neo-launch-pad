import { LaunchManifest } from "@/queries/fetchLaunchManifest";

/**
 * **DO NOT MODIFY**
 * @param {LaunchManifest[]} launchManifest - A launch manifest
 * @returns {LaunchManifest[]} A launch manifest with offset launch dates
 *
 */
function offsetLaunchDate(launchManifest: LaunchManifest[]): LaunchManifest[] {
  launchManifest.forEach((launch: LaunchManifest) => {
    const launchDate = new Date(launch.launch_date_utc);

    launch.launch_date_utc = new Date(
      launchDate.setFullYear(launchDate.getFullYear() + 12)
    );

    launch.done = launch.launch_date_utc < new Date();
  });

  return launchManifest;
}

export { offsetLaunchDate };
