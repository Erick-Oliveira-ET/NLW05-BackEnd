import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    console.log("Chegou aqui");
    try {
      const connection = this.connectionsRepository.create({
        socket_id,
        user_id,
        admin_id,
        id,
      });

      await this.connectionsRepository.save(connection);

      return connection;
    } catch (error) {
      console.log(error);
    }
  }

  async findByUserId(user_id) {
    const connection = this.connectionsRepository.findOne({
      user_id,
    });

    return connection;
  }
}
