import React, { useState } from "react";
import { View } from "react-native";
import { Service } from '../../redux/apis';
import FlexText from "../shered/FlexText";
import ButtonBG from "../ui/buttons/ButtonBG";
import Details from "./Details";
import Review from "./Review";
const tab = ["Details", "Review"];

const Details_Review = ({ service }: { service: Service }) => {
  const component = {
    Details: <Details />,
    Review: <Review service={service} />,
  };
  const [active, setActive] = useState(tab[0]);
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <FlexText>
        {tab?.map((item) => (
          <ButtonBG
            text={item}
            style={{
              width: "auto",
              backgroundColor: item == active ? "#115E59" : "#E6F4F1",
            }}
            textStyle={{
              color: item == active ? "#FFFFFF" : "#000000",
            }}
            handler={() => setActive(item)}
          />
        ))}
      </FlexText>
      {component[active as keyof typeof component]}
    </View>
  );
};

export default Details_Review;
