import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SystemMetricsPage from "./dashboard/system-metrics";
import {
  RecentlyJoinedList,
  UsersJoinedCard,
  UsersOnlineCard,
} from "./dashboard/users";
import MapPage from "./Map/map";
import Icons from "./Icons";
import UsersAnalyticsPage from "./charts/UserAnalytics/users/page";

export default function DashboardTabNavigatior() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="lg:my-7 mx-7">
        {/* id based moving */}
        <TabsTrigger value="overview">
          <span className="flex space-x-1 justify-items-center">
            <h3 className="justify-self-center">System Metrics</h3>
            <Icons.systemMetricsIcon />
          </span>
        </TabsTrigger>
        <TabsTrigger value="users">
          <span className="flex space-x-1 justify-items-center">
            <h3 className="justify-self-center">Users</h3>
            <Icons.userRound />
          </span>
        </TabsTrigger>
        <TabsTrigger value="map">
          <span className="flex space-x-1 justify-items-center">
            <h3 className="justify-self-center">Users Map</h3>
            <Icons.mapPin />
          </span>
        </TabsTrigger>
        <TabsTrigger id="mqtt-analytics" value="mqtt-analytics">
          <span className="flex space-x-1 justify-items-center">
            <h3 className="justify-self-center">Data Analytics</h3>
            <Icons.dashboard />
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent id="overview" value="overview">
        <SystemMetricsPage />
      </TabsContent>
      <TabsContent id="user" value="users" className="space-y-5 min-h-[60vh]">
        <div className="flex">
          <div className="flex space-x-2 lg:ml-10">
            <UsersJoinedCard />
            <UsersOnlineCard />
          </div>
          <div className="lg:ml-10">
            <RecentlyJoinedList />
          </div>
        </div>
      </TabsContent>
      <TabsContent id="map" value="map">
        <div className="flex lg:ml-10 space-x-2">
          <Icons.info />
          <h3 className="text-sm">
            The locations of the users are located by their approximated
            coordinates provided using Geocoding API
          </h3>
        </div>
        <div className="lg:pt-8 lg:px-8 ">
          <MapPage />
        </div>
      </TabsContent>
      <TabsContent
        id="mqtt-analytics"
        value="mqtt-analytics"
        className="space-y-10"
      >
        <UsersAnalyticsPage />
      </TabsContent>
    </Tabs>
  );
}
