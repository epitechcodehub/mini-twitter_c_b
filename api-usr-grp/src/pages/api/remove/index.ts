import { NextApiRequest, NextApiResponse } from "next";
import { posts } from "../../../data/store";

export default function remove(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const {id} = req.body; // recup l'id depuis la data base
        let can_delete = false;
        let id_int = parseInt(id, 10) - 1;
        if (posts.at(id_int) != undefined) {
            can_delete = true;
            delete posts[id];
        }
        if (can_delete == true) {
            res.status(200).json({message: 'Item deleted successfully' });
          } else {
            res.status(404).json({message: 'Item not found' });
          }
    }
}
