import {
  BarChart4Icon,
  BookKeyIcon,
  CameraIcon,
  CheckCircleIcon,
  ChevronRight,
  CircleUserRoundIcon,
  ClipboardCopyIcon,
  Code2Icon,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FilePlus2Icon,
  FolderKeyIcon,
  HelpCircle,
  InfoIcon,
  KeyIcon,
  Loader2Icon,
  LogOutIcon,
  MapPin,
  MoonIcon,
  NewspaperIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelRightClose,
  PencilIcon,
  Settings2Icon,
  SettingsIcon,
  SunIcon,
  TargetIcon,
  ThermometerIcon,
  TrashIcon,
  UserCheckIcon,
  UserRoundIcon,
  UsersRoundIcon,
} from "lucide-react";
const Icons = {
  eyeOn: EyeIcon,
  eyeOff: EyeOffIcon,
  spinner: Loader2Icon,
  drawerOpen: PanelLeftOpenIcon,
  drawerClose: PanelLeftCloseIcon,
  newspaper: NewspaperIcon,
  usersGroup: UsersRoundIcon,
  settings: SettingsIcon,
  logout: LogOutIcon,
  addNews: FilePlus2Icon,
  token: KeyIcon,
  info: InfoIcon,
  generate: BookKeyIcon,
  check: CheckCircleIcon,
  moon: MoonIcon,
  sun: SunIcon,
  camera: CameraIcon,
  post: NewspaperIcon,
  trash: TrashIcon,
  pencil: PencilIcon,
  drawer: PanelRightClose,
  loader2: Loader2Icon,
  help: HelpCircle,
  usersJoined: UserCheckIcon,
  mapPin: MapPin,
  userRound: UserRoundIcon,
  overview: TargetIcon,
  dashboard: BarChart4Icon,
  rightArrow: ChevronRight,
  emptyUsers: (props) => {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M17.5001 12C20.5377 12 23.0001 14.4624 23.0001 17.5C23.0001 20.5376 20.5377 23 17.5001 23C14.4626 23 12.0001 20.5376 12.0001 17.5C12.0001 14.4624 14.4626 12 17.5001 12ZM17.5001 19.751C17.1552 19.751 16.8756 20.0306 16.8756 20.3755C16.8756 20.7204 17.1552 21 17.5001 21C17.845 21 18.1246 20.7204 18.1246 20.3755C18.1246 20.0306 17.845 19.751 17.5001 19.751ZM17.5002 13.8741C16.4522 13.8741 15.6359 14.6915 15.6468 15.8284C15.6494 16.1045 15.8754 16.3262 16.1516 16.3236C16.4277 16.3209 16.6494 16.0949 16.6467 15.8188C16.6412 15.2398 17.0064 14.8741 17.5002 14.8741C17.9725 14.8741 18.3536 15.266 18.3536 15.8236C18.3536 16.0158 18.2983 16.1659 18.1296 16.3851L18.0356 16.501L17.9366 16.6142L17.6712 16.9043L17.5348 17.0615C17.1515 17.5182 17.0002 17.854 17.0002 18.3716C17.0002 18.6477 17.224 18.8716 17.5002 18.8716C17.7763 18.8716 18.0002 18.6477 18.0002 18.3716C18.0002 18.1684 18.0587 18.0126 18.239 17.7813L18.3239 17.6772L18.4249 17.5618L18.6906 17.2713L18.8252 17.1162C19.2035 16.6654 19.3536 16.333 19.3536 15.8236C19.3536 14.7199 18.5312 13.8741 17.5002 13.8741ZM12.0224 13.9993C11.7257 14.4626 11.4862 14.966 11.3137 15.4996L4.25254 15.4999C3.83895 15.4999 3.50366 15.8352 3.50366 16.2488V16.8265C3.50366 17.3622 3.69477 17.8802 4.04263 18.2876C5.29594 19.7553 7.26182 20.5011 10.0001 20.5011C10.5966 20.5011 11.1564 20.4657 11.6804 20.3952C11.9255 20.8901 12.2331 21.3486 12.5919 21.7615C11.7964 21.9217 10.9315 22.0011 10.0001 22.0011C6.85426 22.0011 4.46825 21.0959 2.90194 19.2617C2.32218 18.5828 2.00366 17.7193 2.00366 16.8265V16.2488C2.00366 15.0068 3.01052 13.9999 4.25254 13.9999L12.0224 13.9993ZM10.0001 2.00464C12.7615 2.00464 15.0001 4.24321 15.0001 7.00464C15.0001 9.76606 12.7615 12.0046 10.0001 12.0046C7.2387 12.0046 5.00012 9.76606 5.00012 7.00464C5.00012 4.24321 7.2387 2.00464 10.0001 2.00464ZM10.0001 3.50464C8.06712 3.50464 6.50012 5.07164 6.50012 7.00464C6.50012 8.93764 8.06712 10.5046 10.0001 10.5046C11.9331 10.5046 13.5001 8.93764 13.5001 7.00464C13.5001 5.07164 11.9331 3.50464 10.0001 3.50464Z"
            fill="#A0A0A0"
          ></path>{" "}
        </g>
      </svg>
    );
  },
  circleUserRound: CircleUserRoundIcon,
  metricsLoading: (props) => (
    <svg
      {...props}
      version="1.1"
      id="L1"
      className="fill-black"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 100 100"
    >
      <circle
        fill="none"
        className="stroke-yellow-500"
        stroke-width="6"
        stroke-miterlimit="15"
        stroke-dasharray="14.2472,14.2472"
        cx="50"
        cy="50"
        r="47"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="5s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        fill="none"
        stroke="orange"
        stroke-width="1"
        stroke-miterlimit="10"
        stroke-dasharray="10,10"
        cx="50"
        cy="50"
        r="39"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="5s"
          from="0 50 50"
          to="-360 50 50"
          repeatCount="indefinite"
        />
      </circle>
      <g className="fill-yellow-500">
        <rect x="30" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.1"
          />
        </rect>
        <rect x="40" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.2"
          />
        </rect>
        <rect x="50" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </rect>
        <rect x="60" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.4"
          />
        </rect>
        <rect x="70" y="35" width="5" height="30">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.5"
          />
        </rect>
      </g>
    </svg>
  ),
  userListLoading: (props) => {
    return (
      <svg
        {...props}
        version="1.1"
        id="L7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path
          className="fill-yellow-400"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          className="fill-green-600"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          className="fill-lime-700"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  },
  codeGenerationLoading: (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        className="bg-transparent"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <rect x="19" y="19" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="40" y="19" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.125s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="61" y="19" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.25s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="19" y="40" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.875s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="61" y="40" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.375s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="19" y="61" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.75s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="40" y="61" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.625s"
            calcMode="discrete"
          ></animate>
        </rect>
        <rect x="61" y="61" width="20" height="20" fill="#e15b64">
          <animate
            attributeName="fill"
            values="#f8b26a;#e15b64;#e15b64"
            keyTimes="0;0.125;1"
            dur="1s"
            repeatCount="indefinite"
            begin="0.5s"
            calcMode="discrete"
          ></animate>
        </rect>
      </svg>
    );
  },
  copyToClipboard: ClipboardCopyIcon,
  downloadIcon: DownloadIcon,
  codeIcon: Code2Icon,
  thermometer: ThermometerIcon,
  customerSupportIcon: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      id="_24x24_On_Light_Support"
      data-name="24x24/On Light/Support"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <rect id="view-box" width={24} height={24} fill="none" />
        <path
          id="Shape"
          d="M8,17.751a2.749,2.749,0,0,1,5.127-1.382C15.217,15.447,16,14,16,11.25v-3c0-3.992-2.251-6.75-5.75-6.75S4.5,4.259,4.5,8.25v3.5a.751.751,0,0,1-.75.75h-1A2.753,2.753,0,0,1,0,9.751v-1A2.754,2.754,0,0,1,2.75,6h.478c.757-3.571,3.348-6,7.022-6s6.264,2.429,7.021,6h.478a2.754,2.754,0,0,1,2.75,2.75v1a2.753,2.753,0,0,1-2.75,2.75H17.44A5.85,5.85,0,0,1,13.5,17.84,2.75,2.75,0,0,1,8,17.751Zm1.5,0a1.25,1.25,0,1,0,1.25-1.25A1.251,1.251,0,0,0,9.5,17.751Zm8-6.75h.249A1.251,1.251,0,0,0,19,9.751v-1A1.251,1.251,0,0,0,17.75,7.5H17.5Zm-16-2.25v1A1.251,1.251,0,0,0,2.75,11H3V7.5H2.75A1.251,1.251,0,0,0,1.5,8.751Z"
          transform="translate(1.75 2.25)"
          fill="#141124"
        />
      </g>
    </svg>
  ),
  systemMetricsIcon: Settings2Icon,
  emptyTokenFolder: FolderKeyIcon,
};

export default Icons;
