import { pick } from "@react-native-documents/picker";

export const SelectImage = async () => {
  try {
    const pickResult = (await pick()) as any;
    const file = {
      uri: pickResult.uri,
      name: pickResult.name,
      type: pickResult.type,
    };
  } catch (err: unknown) {
  }
};
