import { LaunchManifest } from "@/queries/fetchLaunchManifest";

export default function MissionCard({
  mission,
  selectHandler,
  selected,
}: {
  mission: LaunchManifest;
  selectHandler: (mission: LaunchManifest) => void;
  selected: boolean;
}) {
  return (
    <div
      key={mission.id}
      onClick={() => selectHandler(mission)}
      className={`p-3 cursor-pointer rounded-lg w-full mb-2 bg-white/10 hover:bg-white/15 ${
        selected ? "outline outline-1 outline-[#dc5301]" : ""
      }`}
    >
      <div className="flex mb-1">
        {!mission.done ? (
          <div className="text-xs bg-[#318629] rounded-md px-1 py-0.5">
            upcoming
          </div>
        ) : (
          <div className="text-xs bg-[#585858] rounded-md px-1 py-0.5">
            completed
          </div>
        )}
        {mission.next && (
          <div className="text-xs bg-[#dc5301] rounded-md px-1 py-0.5 ml-1">
            next
          </div>
        )}
      </div>
      <div className="mt-4">
        <strong>Mission:</strong>&nbsp;
        {mission.mission_name}
        <br />
        <strong>Launch date:</strong>&nbsp;
        {new Date(mission.launch_date_utc).toLocaleDateString()}
      </div>
    </div>
  );
}
