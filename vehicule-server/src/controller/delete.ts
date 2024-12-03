import { VehicleStore } from '../store/vehicle';
import { Request, Response } from 'express';


interface Parameters {
  id: string;
}

export class DeleteVehicleController {
  constructor(private readonly vehicleStore: VehicleStore) {}

  public async handle(req: Request<Parameters>, res: Response): Promise<void> {
    const reqid=req.params.id;
    const idnum=parseInt(reqid);
    const DeleteRequest = {id:idnum}
    await this.vehicleStore.deleteVehicle(DeleteRequest);
    res.status(204).send();
  }
}


