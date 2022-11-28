import { Receipts } from "@/components";
import axios from "@/helper/lib/api";
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import useSWR from "swr";
import ReactToPrint from "react-to-print";

type Props = {};

const Print = (props: Props) => {
  const componentRef = useRef(null);
  const { data: receipts } = useSWR("/api/receipts/19", (url) =>
    axios.get(url).then((res) => res.data.data)
  );
  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
        <Receipts ref={componentRef} data={receipts} />
      </div>
    </>
  );
};

export default Print;