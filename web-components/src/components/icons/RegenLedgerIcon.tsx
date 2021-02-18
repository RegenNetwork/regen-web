import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  color?: string;
  className?: string;
}

export default function RegenLedgerIcon({ color, className }: Props): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 136 61" className={className}>
      <g clipPath="url(#clip0)">
        <path
          d="M28.7372 19.7057L28.7485 19.7246V19.7208V19.7246V19.7208L25.2072 0.947205L22.2461 0L20.4189 2.49304L20.4227 2.49683L28.7372 19.7057Z"
          fill="black"
        />
        <path
          d="M33.7776 11.7379V11.7303L32.1803 10.677L30.6733 11.8553L32.1803 19.1299L33.7776 11.7379Z"
          fill="black"
        />
        <path
          d="M41.8511 13.1433L39.9411 13.3555L37.6807 20.5353L42.6422 14.8748L41.8511 13.1433Z"
          fill="black"
        />
        <path
          d="M58.2764 14.6514L58.2726 11.5673L55.3115 10.6201L55.3078 10.6239L41.3574 23.7635L58.2764 14.6514Z"
          fill="black"
        />
        <path
          d="M24.2086 22.4108L20.0607 16.144L20.1361 16.288L20.0607 16.144L18.1658 16.4471L17.8682 18.3226L17.8832 18.3302L24.2086 22.4108Z"
          fill="black"
        />
        <path
          d="M43.4785 30.2804L50.8813 31.8868H50.8888L52.0115 30.3448L50.8813 28.8103L43.4785 30.2804Z"
          fill="black"
        />
        <path d="M20.9161 30.3105L1.82715 27.8894L0 30.3862L1.83468 32.8755L20.9161 30.3105Z" fill="black" />
        <path
          d="M13.8752 34.4593L13.2837 36.2704L14.8396 37.3843L21.4286 33.6902L13.8752 34.4593Z"
          fill="black"
        />
        <path
          d="M16.0339 39.741L15.9736 41.6392L17.7819 42.2833L23.0675 36.7024L16.0339 39.741Z"
          fill="black"
        />
        <path
          d="M25.5424 39.2749L19.9141 44.2383L20.4302 46.0683L22.3515 46.1478L25.5424 39.2749Z"
          fill="black"
        />
        <path
          d="M32.2141 41.4688L30.7109 48.8039V48.8077L32.2668 49.9216L33.819 48.8001L33.8152 48.7888L32.2141 41.4688Z"
          fill="black"
        />
        <path
          d="M58.3256 45.9508L41.3765 36.8879L55.3683 49.9935L58.3294 49.0349L58.3256 45.9546V45.9508Z"
          fill="black"
        />
        <path
          d="M39.6397 47.3488L35.8271 40.9495L36.6899 48.3074L38.5208 48.8946L39.6434 47.3526L39.6397 47.3488Z"
          fill="black"
        />
        <path
          d="M20.5356 58.2076V58.2114L22.3703 60.7045L25.3277 59.7459L28.7785 40.9609L20.5356 58.2114V58.2076Z"
          fill="black"
        />
        <path
          d="M83.4987 24.4153C84.2213 24.1841 84.852 23.7276 85.2994 23.1119C85.7313 22.4608 85.9476 21.689 85.9173 20.9068C85.9173 19.6565 85.5154 18.7017 84.7117 18.0425C83.9055 17.3794 82.749 17.0498 81.2533 17.0498H75.3462V29.174H78.5145V24.7487H80.4434L83.0805 29.174H86.6481L83.4987 24.4153ZM82.2065 22.142C81.7587 22.4302 81.2295 22.5632 80.6996 22.5209H78.507V19.4368H80.6996C81.2295 19.3944 81.7587 19.5275 82.2065 19.8156C82.3701 19.958 82.4981 20.1372 82.5799 20.3386C82.6617 20.5401 82.6951 20.7581 82.6774 20.975C82.6948 21.1924 82.6613 21.4109 82.5795 21.6129C82.4977 21.815 82.37 21.9949 82.2065 22.1382V22.142Z"
          fill="black"
        />
        <path
          d="M97.9503 26.7302H91.3537V24.2486H96.4057V21.9525H91.3537V19.4936H97.7092V17.0498H88.1553V29.174H97.9503V26.7302Z"
          fill="black"
        />
        <path
          d="M108.122 27.8858L108.212 29.3634H110.382V22.6004H104.731V24.7979H107.715V25.0063C107.73 25.2949 107.676 25.5828 107.558 25.8463C107.44 26.1098 107.261 26.3414 107.037 26.5218C106.514 26.8957 105.881 27.0824 105.24 27.0522C103.278 27.0522 102.296 25.7388 102.294 23.1119C102.294 21.8489 102.539 20.8828 103.028 20.2134C103.275 19.8878 103.598 19.6278 103.967 19.4561C104.337 19.2844 104.743 19.2062 105.149 19.2283C105.688 19.2053 106.219 19.3654 106.656 19.683C107.085 20.0302 107.376 20.5211 107.474 21.0659L110.382 19.8724C109.991 18.8645 109.29 18.0084 108.382 17.4286C107.365 16.8803 106.219 16.6185 105.067 16.6709C103.957 16.6355 102.859 16.897 101.883 17.4286C100.986 17.9461 100.263 18.722 99.8074 19.6565C99.2949 20.7403 99.0457 21.9311 99.0803 23.1308C99.048 24.3299 99.2917 25.5203 99.7924 26.609C100.216 27.5239 100.904 28.2895 101.766 28.8065C102.647 29.3183 103.65 29.5802 104.667 29.5642C106.27 29.5567 107.421 28.9972 108.122 27.8858Z"
          fill="black"
        />
        <path
          d="M122.438 26.7302H115.837V24.2486H120.893V21.9525H115.837V19.4936H122.196V17.0498H112.643V29.174H122.438V26.7302Z"
          fill="black"
        />
        <path
          d="M128.353 22.6156L132.116 29.174H135.623V17.0498H132.836V23.1687L132.907 25.4458H132.888L131.969 23.6083L128.206 17.0498H124.698V29.174H127.49V23.0589L127.414 20.778H127.433L128.353 22.6156Z"
          fill="black"
        />
        <path d="M76.8157 35.3647H75.6177V45.318H82.4855V44.1851H76.8157V35.3647Z" fill="black" />
        <path
          d="M86.3806 40.8396H90.8487V39.7067H86.3806V36.4976H92.1258V35.3647H85.1826V45.318H92.348V44.1851H86.3806V40.8396Z"
          fill="black"
        />
        <path
          d="M98.5415 35.3647H95.3506V45.318H98.5415C101.646 45.318 103.518 43.5372 103.518 40.3395C103.518 37.1417 101.646 35.3647 98.5415 35.3647ZM98.6621 44.1851H96.5486V36.4976H98.6621C100.922 36.4976 102.26 37.9298 102.26 40.3395C102.26 42.7492 100.926 44.1851 98.6621 44.1851Z"
          fill="black"
        />
        <path
          d="M110.567 41.4269H113.716V41.7717C113.716 43.4918 112.443 44.3367 110.793 44.3367C108.589 44.3367 107.402 42.8439 107.402 40.3395C107.402 37.8351 108.755 36.3461 110.763 36.3461C112.142 36.3461 113.189 36.9485 113.626 38.0928L114.718 37.4903C113.965 35.9521 112.726 35.217 110.763 35.217C107.99 35.217 106.144 37.1948 106.144 40.3433C106.144 43.4918 107.93 45.4658 110.759 45.4658C112.266 45.4658 113.306 44.9088 113.878 43.973L113.92 45.318H114.82V40.2941H110.567V41.4269Z"
          fill="black"
        />
        <path
          d="M119.412 40.8396H123.88V39.7067H119.412V36.4976H125.154V35.3647H118.214V45.318H125.38V44.1851H119.412V40.8396Z"
          fill="black"
        />
        <path
          d="M133.284 41.048C133.916 40.918 134.482 40.5677 134.882 40.0589C135.283 39.5502 135.492 38.9156 135.473 38.267C135.473 36.4749 134.135 35.3572 132.127 35.3572H128.36V45.3104H129.596V41.1844H131.961L134.663 45.318H136.087L133.284 41.048ZM129.596 40.0553V36.4976H132.127C133.536 36.4976 134.226 37.0849 134.226 38.2746C134.226 39.4643 133.536 40.0553 132.127 40.0553H129.596Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="136" height="61" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}