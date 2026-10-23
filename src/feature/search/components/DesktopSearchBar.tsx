import { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { X,
 Search,
  Navigation,
  Landmark,
  DoorClosed,
  Home,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
interface LocationOptions {
  icon: LucideIcon,
  title: string;
  subTitle: string;
  iconBg: string;
  iconColor: string;
}
const locations: LocationOptions[] = [
   {
    icon: Navigation,
    title: "Nearby",
    subTitle: "Find places to stay near you",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: Landmark,
    title: "Addis Ababa",
    subTitle: "Explore stays in Ethiopia's capital",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
  },
  {
    icon: DoorClosed,
    title: "Hawassa",
    subTitle: "Relax near the lakeside",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    icon: Home,
    title: "Bahir Dar",
    subTitle: "Discover stays by Lake Tana",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

export default function DesktopSearchBar(){
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("where")
  const containerRef = useRef<HTMLDivElement>(null);
  const handleTabClick = (tabValue: string) => {
  if(activeTab === tabValue){
    setIsOpen((prev) => !prev)
  }else{
    setIsOpen(true);
    setActiveTab(tabValue)
  }
  }
   const handleSearch = () => {

setIsOpen(false);

navigate(

buildSearchUrl({

location,

dates,

guests,

})

);

}; 
  return(
    <div ref={containerRef} className="relative inline-block">
    <Tabs 
      value={isOpen ? activeTab : ""}
      className="hidden data-active:bg-[#ebebeb] bg-white rounded-full md:block w-full max-w-[800px] mx-auto">
   <TabsList>
    <TabsTrigger 
     value="where"
     onClick={() => handleTabClick("where")}
     className="p-3 hover:rounded-full flex flex-col items-start">
      <span>Where</span>
      <div className="relative">
        <Search 
         size={16}
         className="absolute top-1/2 -translate-y-1/2"
         />
      </div>
     </TabsTrigger>
      <TabsTrigger 
     value="when"
     onClick={() => handleTabClick("when")}
     className="p-3 hover:rounded-full flex flex-col items-start">
      <span>Where</span>
      <div className="relative">
        <Search 
         size={16}
         className="absolute top-1/2 -translate-y-1/2"
         />
      </div>
     </TabsTrigger>
     <TabsTrigger 
     value="who"
     onClick={() => handleTabClick("who")}
     className="p-3 rounded-full flex flex-col items-start">
      <span>Where</span>
      <div className="relative">
        <Search 
         size={16}
         className="absolute top-1/2 -translate-y-1/2"
         />
      </div>
      <div role="button"
           tabIndex={0}
           onClick={(e) => {
            e.stopPropagation();
            handleSearch();
           }}
     </TabsTrigger>
   </TabsList>
   {isOpen && (
    <>
      <TabsContent value="where" className="left-0 w-[400px]">
      <div className="flex flex-col gap-2.5
       rounded-4xl border bg-white px-5 py-7 shadow-md">
  {locations.map((item) => {
    const Icon = item.icon;

    return (
      <button
        key={item.title}
        type="button"
        onClick={() => {
        setLocation(item.title);
        setActiveTab("when");
      }}
        className="flex w-full items-center gap-4 rounded-xl 
         text-left transition-colors duration-200 hover:bg-[#ebebeb]
          focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-gray-300"
      >
        <div className={`flex h-14 w-14 shrink-0 
        items-center justify-center rounded-lg opacity-35 ${item.iconBg}`}>
          <Icon size={22} className={item.iconColor}/>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-900">
            {item.title}
          </span>

          <span className="text-sm text-gray-500">
            {item.subTitle}
          </span>
        </div>
      </button>
    );
  })}
</div>

        
      </TabsContent>
      <TabsContent value="when" className="w-full left-0">
        <div className="bg-white p-4 rounded-4xl shadow-md">
      na
        </div>
      </TabsContent>
      <TabsContent value="who" className="w-[400px] right-0">
        <div className="bg-white p-4 rounded-4xl shadow-md">
          na
        </div>
      </TabsContent>
    </>
   )}
      </Tabs>
    </div>
  )
}