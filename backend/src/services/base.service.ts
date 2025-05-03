import mongoose, {
  model,
  Model,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
} from "mongoose";

export class BaseService<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  protected async create(entity: any, userId: string) {
    const newEntity = new this.model({ ...entity, userId, date: new Date() });
    await newEntity.save();
    return newEntity;
  }

  async createWithStatus(entity: any, userId: string) {
    try {
      return await this.create(entity, userId);
    } catch (error) {
      throw new Error("falid to save entity");
    }
  }

  async getById(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new Error("invalid id");

    return (await this.model.findById(id).lean<T>().exec()) as T;
  }

  async getByFilter(filter: RootFilterQuery<T> = {}) {
    return (await this.model.find(filter).lean<T>().exec()) as T[];
  }

  async getModelByFilter(filter: RootFilterQuery<T> = {}) {
    return (await this.model.findOne(filter)) as T;
  }

  async deleteById(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new Error("invalid id");

    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount == 1;
  }

  async validateUserId(entityId: string, userId: string, idFieldName: keyof T) {
    const entity = await this.getById(entityId);
    if (!entity) {
      throw new Error("Entity not found");
    }

    return entity[idFieldName] == userId || false;
  }

  async getAll(): Promise<T[]> {
    return (await this.model.find().lean<T>().exec()) as T[];
  }

  async update(updatedEntity: Partial<T>, id: string) {
    const updatedDate = new Date();
    const updateData: Partial<T> = {
      date: updatedDate,
      ...updatedEntity,
    };
    let updatedEntityResult;
    try {
      updatedEntityResult = await this.model.findByIdAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedEntityResult) {
        throw new Error("entity not found");
      }
    } catch (error) {
      throw new Error("failed to update entity");
    }
    return updatedEntityResult;
  }

  async customizedUpdate(
    id: string,
    updateQueryConfig: UpdateQuery<T>,
    options: QueryOptions<T> | null
  ) {
    let updatedEntityResult;
    try {
      updatedEntityResult = await this.model.findByIdAndUpdate(
        id,
        updateQueryConfig,
        options
      );

      if (!updatedEntityResult) {
        throw new Error("entity not found");
      }
    } catch (error) {
      throw new Error("failed to update entity");
    }

    return updatedEntityResult;
  }
}
