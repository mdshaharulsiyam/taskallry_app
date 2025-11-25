import { pick } from "@react-native-documents/picker";

export type PickedFile = {
  uri: string;
  name: string;
  type: string;
};

export const SelectImage = async (): Promise<PickedFile | null> => {
  try {
    const pickResult = (await pick()) as any;
    if (!pickResult) return null;

    const item = Array.isArray(pickResult) ? pickResult[0] : pickResult;
    if (!item) return null;

    const uri: string | undefined = item.uri || item.fileCopyUri;
    const name: string | undefined = item.name || (uri ? uri.split("/").pop() : undefined);
    const type: string | undefined = item.type;

    if (!uri) return null;

    const file: PickedFile = {
      uri,
      name: name || "file",
      type: type || "application/octet-stream",
    };

    return file;
  } catch (err: unknown) {
    return null;
  }
};
