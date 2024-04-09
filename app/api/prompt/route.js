import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  const searchText = request.nextUrl.searchParams.get("searchText");

  try {
    await connectToDB();

    let prompts;

    if (searchText) {
      prompts = await Prompt.find({ $text: { $search: searchText } }).populate(
        "creator"
      );
    } else {
      prompts = await Prompt.find({}).populate("creator");
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
