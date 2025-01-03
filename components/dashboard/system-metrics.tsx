"use client";
import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import Icons from "../Icons";
import Image from "next/image";

const SystemMetricsPage = () => {
  const [url, setUrl] = useState<string>(
    process.env.NEXT_PUBLIC_GRAPHANA_DASHBOARD_URL as string,
  );
  const [graphLoading, setGraphLoading] = useState(true); // State for your custom loading state
  const [iframeLoaded, setIframeLoaded] = useState(false); // State to track iframe loading

  // Simulating a loading state with setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setGraphLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  // Function to handle iframe load event
  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="container flex flex-col items-center space-y-2">
      {graphLoading && (
        <div className="container flex flex-col items-center space-y-2 lg:mt-40">
          <Icons.metricsLoading width={72} height={72} />
          <h5 className="animate-pulse delay-1000 font-mono text-sm">
            Generating System Metrics Analytics
          </h5>
        </div>
      )}

      {/* Conditionally render the iframe */}
      {!graphLoading && (
        <>
          {/* <Iframe */}
          {/*   url={url} */}
          {/*   frameBorder={0} */}
          {/*   className={`container lg:h-[130vh] ${iframeLoaded ? '' : 'hidden'}`} */}
          {/*   onLoad={handleIframeLoad} */}
          {/* /> */}
          <Image
            src="/images/grafana1.png"
            height={500}
            width={window.outerWidth}
            alt="dashboard image"
          />
          <Image
            src="/images/grafana2.png"
            className="mt-[-10px]"
            height={500}
            width={window.outerWidth}
            alt="dashboard image"
          />
        </>
      )}
    </div>
  );
};

export default SystemMetricsPage;
