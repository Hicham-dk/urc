import {getConnecterUser, triggerNotConnected} from "../lib/session";
// import {kv} from "@vercel/kv";

export default async (request, response) => {
/*    try {
        const headers = new Headers(request.headers);
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }

        const message = await request.body;


        response.send("OK");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
    */
    const publishResponse = await beamsClient.publishToUsers([targetUser.externalId], {
        web: {
            notification: {
                title: user.username,
                body: message.content,
                ico: "https://www.univ-brest.fr/themes/custom/ubo_parent/favicon.ico",
                deep_link: "" /* lien permettant d'ouvrir directement la conversation concernée */,
            },
            data: {
                /* additionnal data */
            }
        },
    });
};
