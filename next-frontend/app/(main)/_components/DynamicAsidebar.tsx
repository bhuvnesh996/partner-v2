import React, { useState } from "react";
import { useUniversity } from "@/context/university-context";
import {
  ChevronsUpDown,
  EllipsisIcon,
  Home,
  Loader,
  Lock,
  LogOut,
  MoonIcon,
  MoonStarIcon,
  Settings,
  SunIcon,
  FileMinus ,
  WalletCards,
  MonitorDown ,
  School,
  User,
  ArrowLeft,
  Video,
  Book,
  Users,
  ClipboardCheck,
  Users2,
  FileText,
  MessageSquare,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuthContext } from "@/context/auth-provider";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutDialog from "./_common/LogoutDialog";
import { verticalStyles } from "@/lib/vertical-styles";

const DynamicAsidebar = () => {
  const { selectedUniversity, setSelectedUniversity } = useUniversity();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isLoading, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useSidebar();

  // Get base URL prefix based on vertical
  console.log("university",selectedUniversity)
  const getBaseUrl = () => {
    if (!selectedUniversity) return "";
    return `/${selectedUniversity?.vertical?.toLowerCase()}`;
  };

  // Get styles for current vertical
  const getStyles = () => {
    if (!selectedUniversity) return {};
    return verticalStyles[selectedUniversity.vertical];
  };

  // Common items across all layouts
  const commonItems = [
    {
      title: "Home",
      url: `${getBaseUrl()}/home`,
      icon: Home,
    },
    {
      title: "University",
      url: `${getBaseUrl()}/university`,
      icon: School,
    },
    {
      title: "Course",
      url: `${getBaseUrl()}/course`,
      icon: Home,
    },
    {
      title: "Commission",
      url: `${getBaseUrl()}/commission`,
      icon: Home,
    },
    {
      title: "Wallet",
      url: `${getBaseUrl()}/wallet`,
      icon: WalletCards,
    },
    {
      title: "Promotional",
      url: `${getBaseUrl()}/promotional`,
      icon: MonitorDown,
    },
    {
      title: "Settings",
      url: `${getBaseUrl()}/settings`,
      icon: Settings,
    },
    {
      title: "Sessions",
      url: `${getBaseUrl()}/sessions`,
      icon: Lock,
    },
  ];

  // Vertical-specific items
  const verticalItems = {
    ONLINE: [
        {
            title: "Home",
            url: "/online",
            icon: Home,
        },
   
      {
        title: "Leads",
        url: "/online/leads",
        icon: FileMinus ,
      },
      {
        title: "Admissions",
        url: "/online/admission",
        icon: Users,
      },
      {
        title: "Course",
        url: "/online/course",
        icon: Book ,
      },      
      {
        title: "My University",
        url: "/online/university",
        icon: School ,
      },
    ],
    REGULAR: [
            {
              title: "Home",
              url: "/regular",
              icon: Home,
          },
        {
          title: "Admissions",
          url: "/regular/admissions",
          icon: Users,
        },
        {
          title: "Course",
          url: "/regular/course",
          icon: Book ,
        },      
        {
          title: "My University",
          url: "/regular/university",
          icon: School ,
        },
    ],
    DISTANCE: [
            {
              title: "Home",
              url: "/distance",
              icon: Home,
          },
        {
          title: "Admissions",
          url: "/distance/admission",
          icon: Users,
        },
        {
          title: "Course",
          url: "/distance/course",
          icon: Book ,
        },      
        {
          title: "My University",
          url: "/distance/university",
          icon: School ,
        },
    ],
  };

  const handleBackToDashboard = () => {
    setSelectedUniversity(null);
    router.push('/home');
  };

  const items = selectedUniversity
    ? verticalItems[selectedUniversity.vertical]
    : commonItems;

  const pathname = usePathname();
  // Skip rendering if we're at the root
  if (pathname === '/') return null;

  return (
    <>
      <Sidebar collapsible="icon" className={`${getStyles()?.sidebar?.background} transition-colors duration-200`}>
        <SidebarHeader className={`border-b p-0 dark:bg-background ${getStyles()?.sidebar?.border}`}>
          <div className="flex h-[60px] items-center">
            {selectedUniversity ? (
              <div className="flex items-center gap-2 px-4">
                {selectedUniversity.universityLogo ? (
                  <img
                    src={selectedUniversity.universityLogo}
                    alt={selectedUniversity.universityName}
                    className="h-8 w-8 rounded-lg"
                  />
                ) : (
                  <School className="h-8 w-8" />
                )}
                {open && (
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {selectedUniversity.universityShortName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {selectedUniversity.vertical} Portal
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <Logo fontSize="18px" size={open ? "full" : "small"} url="/home" />
            )}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${getStyles()?.sidebar?.hover} transition-colors duration-200`}
                    >
                      <Link href={item.url} className="!text-[15px]">
                        <item.icon
                          className={pathname === item.url ? getStyles()?.sidebar?.text : ''}
                        />
                        <span
                          className={pathname === item.url ? getStyles()?.sidebar?.text : ''}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="dark:bg-background">
          <SidebarMenu>
            <SidebarMenuItem>
              {isLoading ? (
                <Loader
                  size="24px"
                  className="place-self-center self-center animate-spin"
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                          {user?.name?.split(" ")?.[0]?.charAt(0)}
                          {user?.name?.split(" ")?.[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                      <EllipsisIcon className="ml-auto size-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={"bottom"}
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuRadioGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          setTheme(theme === "light" ? "dark" : "light")
                        }
                      >
                        {theme === "light" ? <MoonStarIcon /> : <SunIcon />}
                        Toggle theme
                      </DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                      <LogOut />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <LogoutDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DynamicAsidebar;