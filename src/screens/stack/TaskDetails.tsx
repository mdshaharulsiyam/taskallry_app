import { useRoute } from "@react-navigation/native";
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
  return <DetailsTask heading={heading} from={from} id={id} />;
};

export default TaskDetails;
