import Customer from "./customer.entity.js";
import CustomerDocument from "./customer.document.js";
import CustomerDto from "./dto/customer.dto.js";

export default class CustomerMapper {
    static toEntity(document: CustomerDocument | null | undefined): Customer | null {
        return document ? { id: document._id, name: document.name } : null;
    }

    static toDto(entity: Customer | null | undefined): CustomerDto | null {
        return entity ? { id: entity.id, name: entity.name } : null;
    }
}
