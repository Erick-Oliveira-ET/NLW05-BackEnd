import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();
  let user_id = null;

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email }: IParams = params;
    console.log({ text, email });

    console.log("Passou aqui");
    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      console.log("Passou aqui");
      const user = await usersService.create(email);

      console.log("Depois aqui");
      await connectionsService.create({ socket_id, user_id: user.id });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId(userExists.id);

      if (!connection) {
        await connectionsService.create({ socket_id, user_id: userExists.id });
      } else {
        connection.socket_id = socket_id;

        // This will update the connection with this user in the database
        await connectionsService.create(connection);
      }
    }

    await messagesService.create({ text, user_id });

    console.log(params);

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allUsers);
  });
});
