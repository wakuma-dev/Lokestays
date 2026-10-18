import { useMemo, useReducer, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Search,
  Users,
} from "lucide-react";

import type {
  DestinationOption,
  GuestCounts,
  SearchPanel,
} from "../types/search.types";

import { searchReducer } from "../state/search-reducer";
import { createInitialState } from "../state/createInitialState";
import { toExploreSearch } from "../schemas/exploreSearchSchema";

import { useToday } from "../hooks/useToday";
import { useMediaQuery } from "../hooks/useMediaQuery";

import {
  getDateSummary,
  getDestinationSummary,
  getGuestSummary,
} from "../utils/search-summaries";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import MobileCard from "./MobileCard";
import SearchDialog from "./SearchDialog";
import DestinationPanel from "./destination/DestinationPanel";
import DatesPanel from "./dates/DatesPanel";
import GuestsPanel from "./guests/GuestsPanel";

interface SearchBarProps {
  initialSearch?: Partial<{
    destination: string;
    destinationId: string;
    checkIn: string | null;
    checkOut: string | null;
    adults: number;
    children: number;
    infants: number;
    pets: number;
    lat: number;
    lng: number;
  }>;
  onSearch?: (search: ReturnType<typeof toExploreSearch>) => void;
  className?: string;
}

export default function SearchBar({
  initialSearch,
  onSearch = () => undefined,
  className = "",
}: SearchBarProps) {
  const [state, dispatch] = useReducer(
    searchReducer,
    createInitialState(initialSearch),
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  const [mobileDialogPanel, setMobileDialogPanel] =
    useState<SearchPanel>("destination");

  const isMobile = useMediaQuery("(max-width: 767px)");
  const { today } = useToday();

  const destinationSummary = getDestinationSummary(
    state.destination,
    state.destinationQuery,
  );

  const dateSummary = getDateSummary(
    state.checkIn,
    state.checkOut,
  );

  const guestSummary = getGuestSummary(state.guests);

  const selectedDestination = state.destination;
  const guests: GuestCounts = state.guests;
  const destinationQuery = state.destinationQuery;
  const activePanel = state.activePanel;

  const handleDestinationQueryChange = (query: string) => {
    dispatch({
      type: "SET_DESTINATION_QUERY",
      payload: query,
    });
  };

  const handleSelectDestination = (
    destination: DestinationOption,
  ) => {
    dispatch({
      type: "SELECT_DESTINATION",
      payload: destination,
    });

    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: null,
    });
  };

  const handleSelectDate = (date: string) => {
    dispatch({
      type: "SELECT_DATE",
      payload: date,
    });
  };

  const handleClearDates = () => {
    dispatch({
      type: "CLEAR_DATES",
    });
  };

  const handleGuestChange = (
    guestType: keyof GuestCounts,
    count: number,
  ) => {
    dispatch({
      type: "SET_GUEST_COUNT",
      payload: {
        guestType,
        count,
      },
    });
  };

  const handleSearch = () => {
    const search = toExploreSearch(state);

    onSearch(search);
    setDialogOpen(false);

    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: null,
    });
  };

  const handleOpenDialog = (
    panel: SearchPanel = "destination",
  ) => {
    setMobileDialogPanel(panel);

    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: panel,
    });

    setDialogOpen(true);
  };

  const handleDialogPanelChange = (panel: SearchPanel) => {
    setMobileDialogPanel(panel);

    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: panel,
    });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);

    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: null,
    });
  };

  const handleCloseDesktopPanel = () => {
    dispatch({
      type: "SET_ACTIVE_PANEL",
      payload: null,
    });
  };

  const desktopPanel = useMemo(() => {
    switch (activePanel) {
      case "destination":
        return (
          <DestinationPanel
            query={destinationQuery}
            selectedDestination={selectedDestination}
            onQueryChange={handleDestinationQueryChange}
            onSelectDestination={handleSelectDestination}
            onClose={handleCloseDesktopPanel}
          />
        );

      case "dates":
        return (
          <DatesPanel
            checkIn={state.checkIn}
            checkOut={state.checkOut}
            today={today}
            onSelectDate={handleSelectDate}
            onClearDates={handleClearDates}
            onClose={handleCloseDesktopPanel}
          />
        );

      case "guests":
        return (
          <GuestsPanel
            guests={guests}
            onChange={handleGuestChange}
            onClose={handleCloseDesktopPanel}
          />
        );

      default:
        return null;
    }
  }, [
    activePanel,
    destinationQuery,
    selectedDestination,
    state.checkIn,
    state.checkOut,
    today,
    guests,
  ]);

  if (isMobile) {
    return (
      <>
        <MobileCard
          destinationSummary={destinationSummary}
          dateSummary={dateSummary}
          guestSummary={guestSummary}
          onOpenSearch={() =>
            handleOpenDialog(mobileDialogPanel)
          }
        />

        <SearchDialog
          open={dialogOpen}
          activePanel={mobileDialogPanel}
          destinationQuery={destinationQuery}
          selectedDestination={selectedDestination}
          checkIn={state.checkIn}
          checkOut={state.checkOut}
          guests={guests}
          today={today}
          onDestinationQueryChange={handleDestinationQueryChange}
          onSelectDestination={handleSelectDestination}
          onSelectDate={handleSelectDate}
          onClearDates={handleClearDates}
          onGuestChange={handleGuestChange}
          onPanelChange={handleDialogPanelChange}
          onClose={handleCloseDialog}
          onSearch={handleSearch}
        />
      </>
    );
  }

  return (
    <div
      className={`relative mx-auto w-full max-w-4xl ${className}`}
    >
      <Tabs
        value={activePanel ?? "destination"}
        onValueChange={(value) => {
          const panel = value as SearchPanel;

          dispatch({
            type: "SET_ACTIVE_PANEL",
            payload: panel,
          });
        }}
        className="w-full"
      >
        <div className="rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md">
          <TabsList className="flex h-auto w-full items-center justify-between gap-1 rounded-full bg-transparent p-0">
            <TabsTrigger
              value="destination"
              className="min-w-0 flex-1 justify-start rounded-full px-4 py-3 text-left data-[state=active]:bg-gray-100"
            >
              <MapPin
                size={18}
                aria-hidden="true"
                className="mr-3 shrink-0 text-gray-600"
              />

              <span className="min-w-0">
                <span className="block text-xs font-semibold text-gray-900">
                  Where
                </span>

                <span className="mt-1 block truncate text-sm font-normal text-gray-500">
                  {destinationSummary || "Search destinations"}
                </span>
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="dates"
              className="min-w-0 flex-1 justify-start rounded-full px-4 py-3 text-left data-[state=active]:bg-gray-100"
            >
              <CalendarDays
                size={18}
                aria-hidden="true"
                className="mr-3 shrink-0 text-gray-600"
              />

              <span className="min-w-0">
                <span className="block text-xs font-semibold text-gray-900">
                  When
                </span>

                <span className="mt-1 block truncate text-sm font-normal text-gray-500">
                  {dateSummary || "Add dates"}
                </span>
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="guests"
              className="min-w-0 flex-1 justify-start rounded-full px-4 py-3 text-left data-[state=active]:bg-gray-100"
            >
              <Users
                size={18}
                aria-hidden="true"
                className="mr-3 shrink-0 text-gray-600"
              />

              <span className="min-w-0">
                <span className="block text-xs font-semibold text-gray-900">
                  Who
                </span>

                <span className="mt-1 block truncate text-sm font-normal text-gray-500">
                  {guestSummary || "Add guests"}
                </span>
              </span>
            </TabsTrigger>

            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search stays"
              className="ml-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <Search size={20} aria-hidden="true" />
            </button>
          </TabsList>
        </div>

        <TabsContent
          value="destination"
          className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[75vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
        >
          <DestinationPanel
            query={destinationQuery}
            selectedDestination={selectedDestination}
            onQueryChange={handleDestinationQueryChange}
            onSelectDestination={handleSelectDestination}
            onClose={handleCloseDesktopPanel}
          />
        </TabsContent>

        <TabsContent
          value="dates"
          className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[75vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
        >
          <DatesPanel
            checkIn={state.checkIn}
            checkOut={state.checkOut}
            today={today}
            onSelectDate={handleSelectDate}
            onClearDates={handleClearDates}
            onClose={handleCloseDesktopPanel}
          />
        </TabsContent>

        <TabsContent
          value="guests"
          className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[75vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl"
        >
          <GuestsPanel
            guests={guests}
            onChange={handleGuestChange}
            onClose={handleCloseDesktopPanel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
