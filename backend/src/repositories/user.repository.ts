

class UserRepository {
    async createOrder(data: any): Promise<OrderFields | null> {
        return new Promise<OrderFields | null>(async (resolve, reject) => {
            try {
                const response = await getOrderModel().create(data);
                resolve(response);
            } 
            catch (err) {
                reject(err);
            }
        });
    }

    async getOrders(condition: any = {}): Promise<OrderFields[] | []> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await getOrderModel().findAll(condition);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

    async getOrder(condition: any): Promise<OrderFields | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await getOrderModel().findOne(condition);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }

}

export default new UserRepository()