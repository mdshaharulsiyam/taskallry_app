import { useRoute } from "@react-navigation/native";
import React, { Suspense } from "react";
import DetailsTask from "../../components/taskDetails/DetailsTask";

const TaskDetails = () => {
  const {
    params: { heading, from, id },
  } = useRoute().params as {
    params: {
      heading: "Tasks Details" | "My Tasks Details";
      from: "user" | "service";
      id: string;
    };
  };
  const DetailsTaskAny = DetailsTask as any;
  return (
    <Suspense>
      <DetailsTaskAny heading={heading} from={from} id={id} />
    </Suspense>
  );
};

export default React.memo(TaskDetails);
