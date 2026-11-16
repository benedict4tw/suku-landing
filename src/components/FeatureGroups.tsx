import { useTranslation } from "react-i18next";
import { CalendarCheck, Flag, FolderKanban, Flame, Trophy, Gauge, BellRing, Sunrise, AlertCircle } from "lucide-react";
import { FeatureGroup } from "./FeatureGroup";
import { TaskList, ProjectProgress, WeekCalendar, WhiteboardMock } from "./fragments/PlanFragments";
import { ProgressBars, HabitStreaks, GymLog } from "./fragments/TrackFragments";
import { StatTiles, NotificationStack, BriefingPair } from "./fragments/AiFragments";

export function FeatureGroups() {
  const { t } = useTranslation();
  return (
    <div id="how">
      <FeatureGroup
        id="plan"
        ns="groups.plan"
        wide={{
          key: "tasks",
          title: t("groups.plan.tasks.title"),
          body: t("groups.plan.tasks.body"),
          ui: (
            <div className="grid gap-4 sm:grid-cols-[1.35fr_1fr] sm:items-start">
              <TaskList />
              <ProjectProgress />
            </div>
          ),
        }}
        small={[
          { key: "calendar", title: t("groups.plan.calendar.title"), body: t("groups.plan.calendar.body"), ui: <WeekCalendar /> },
          { key: "whiteboards", title: t("groups.plan.whiteboards.title"), body: t("groups.plan.whiteboards.body"), ui: <WhiteboardMock /> },
        ]}
        captions={[
          { icon: Flag, key: "c1" },
          { icon: FolderKanban, key: "c2" },
          { icon: CalendarCheck, key: "c3" },
        ]}
      />

      <FeatureGroup
        id="track"
        ns="groups.track"
        wide={{
          key: "progress",
          title: t("groups.track.progress.title"),
          body: t("groups.track.progress.body"),
          ui: <ProgressBars large />,
        }}
        small={[
          { key: "habits", title: t("groups.track.habits.title"), body: t("groups.track.habits.body"), ui: <HabitStreaks /> },
          { key: "gym", title: t("groups.track.gym.title"), body: t("groups.track.gym.body"), ui: <GymLog /> },
        ]}
        captions={[
          { icon: Flame, key: "c1" },
          { icon: Trophy, key: "c2" },
          { icon: Gauge, key: "c3" },
        ]}
      />

      <FeatureGroup
        id="focus"
        ns="groups.focus"
        wide={{
          key: "dashboard",
          title: t("groups.focus.dashboard.title"),
          body: t("groups.focus.dashboard.body"),
          ui: <StatTiles />,
        }}
        small={[
          { key: "reminders", title: t("groups.focus.reminders.title"), body: t("groups.focus.reminders.body"), ui: <NotificationStack /> },
          { key: "briefing", title: t("groups.focus.briefing.title"), body: t("groups.focus.briefing.body"), ui: <BriefingPair /> },
        ]}
        captions={[
          { icon: AlertCircle, key: "c1" },
          { icon: Sunrise, key: "c2" },
          { icon: BellRing, key: "c3" },
        ]}
      />
    </div>
  );
}
