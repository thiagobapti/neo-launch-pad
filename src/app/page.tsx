"use client";

import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import "moment-duration-format";
import {
  LaunchManifest,
  fetchLaunchManifest,
} from "@/queries/fetchLaunchManifest";
import GalaxyBg from "./components/galaxy-bg";
import MissionCard from "./components/mission-card";
import { Bungee_Spice } from "next/font/google";
import "../styles/globals.css";
import Rocket from "./components/rocket";
import ActionButton from "./components/action-button";

const bungee = Bungee_Spice({ subsets: ["latin"], weight: "400" });

export default function LaunchControlPage() {
  const [launches, setLaunches] = useState<LaunchManifest[]>([]);
  const [rocketPosition, setRocketPosition] = useState(-120);
  const [timeFormatted, setTimeFormatted] = useState<string>("");
  const [selectedMission, setSelectedMission] = useState<LaunchManifest | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const manifest = await fetchLaunchManifest(0);
      setLaunches(manifest);

      const nextLaunch = manifest.find((launch) => !launch.done);
      if (nextLaunch) nextLaunch.next = true;

      setSelectedMission(nextLaunch ?? null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedMission) {
      setTimeFormatted("");
      return;
    }

    const updateTimer = () => {
      const now = moment();
      const targetDate = moment(selectedMission.launch_date_utc);
      const _duration = moment.duration(targetDate.diff(now));
      const formatted = _duration.format(
        "Y [years], M [months], D [days], HH:mm:ss"
      );

      setTimeFormatted(formatted);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [selectedMission]);

  const selectMissionHandler = useCallback((mission: LaunchManifest) => {
    setSelectedMission(mission);
  }, []);

  const loadMore = useCallback(async () => {
    const manifest = await fetchLaunchManifest(launches.length);
    setLaunches((prev) => [...prev, ...manifest]);
  }, [launches]);

  const anticipateLaunch = useCallback(() => {
    if (!selectedMission) return;

    const newLaunchDate = moment().add(10, "seconds").toDate();
    const updatedMission = {
      ...selectedMission,
      launch_date_utc: newLaunchDate,
    };

    setSelectedMission(updatedMission);
    setLaunches((prevLaunches) =>
      prevLaunches.map((mission) =>
        mission.id === updatedMission.id ? updatedMission : mission
      )
    );

    setTimeout(() => {
      setRocketPosition(window.innerHeight);

      const updatedMission = {
        ...selectedMission,
        done: true,
        next: false,
      };

      setSelectedMission(updatedMission);
      setLaunches((prevLaunches) =>
        prevLaunches.map((mission) =>
          mission.id === updatedMission.id ? updatedMission : mission
        )
      );
    }, 10000);
  }, [selectedMission]);

  return (
    <main className="font-mono text-sm ">
      <GalaxyBg />
      <div className="text-white w-[350px] h-screen flex flex-col items-center ml-[10px]">
        <div className="text-2xl mt-12" style={bungee.style}>
          NEO Launch Pad
        </div>
        <br />
        <div className="p-[10px] pb-5 border-b border-[#aeaeae] leading-normal">
          Welcome to the Launch center! Our launch control center is the place
          to be if you want to witness the most epic rocket launches in the
          galaxy. Our team of rocket scientists and space enthusiasts will guide
          you through every step of the launch process, from ignition to
          liftoff. You’ll feel the ground shake beneath your feet as the
          countdown begins, and the excitement builds. And when the rocket
          finally takes off, you’ll be blown away by the sheer power and majesty
          of it all. So come on down to the Launch center and experience the
          thrill of a lifetime!
        </div>
        <button
          onClick={loadMore}
          className="bg-[#dc5301] rounded-md px-1 py-[1px] mb-5 mt-5"
        >
          load upcoming missions ⏳
        </button>
        {launches
          .slice()
          .reverse()
          .map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              selectHandler={selectMissionHandler}
              selected={selectedMission?.id === mission.id}
            />
          ))}
      </div>

      <div className="fixed top-[10px] left-[370px] right-[10px] p-5 rounded-lg text-white bg-white/10 flex flex-row min-h-[200px]">
        <div className="w-[260px] flex flex-col items-center border-r border-[#dc5301]">
          Actions
          {selectedMission?.next && (
            <ActionButton onClick={anticipateLaunch}>
              Launch Now 🚀
            </ActionButton>
          )}
          {selectedMission?.links.wikipedia && (
            <ActionButton
              onClick={() =>
                window.open(selectedMission.links.wikipedia, "_blank")
              }
            >
              Wikipedia 📚
            </ActionButton>
          )}
          {selectedMission?.links.video_link && (
            <ActionButton
              onClick={() =>
                window.open(selectedMission.links.video_link, "_blank")
              }
            >
              Video 🎥
            </ActionButton>
          )}
        </div>
        <div className="flex flex-col items-center w-full">
          {selectedMission && (
            <>
              Time to launch
              <div className={`${bungee.className} text-[44px] mt-4`}>
                {selectedMission.done ? "00" : timeFormatted}
              </div>
            </>
          )}
        </div>
      </div>
      <Rocket rocketPosition={rocketPosition} />
    </main>
  );
}
