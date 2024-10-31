import Phone from "./schema";


interface Phone {
    id: string
    name: string
    number: string
}

const tranform = (phone: any): Phone | undefined => {
    const {_id, name, number} = phone
    if (_id && name && number) {
        return {id: _id.toString(), name, number}
    } 
    return;
}

export class phonebookMongoRepository  {
    getAllPhonebook = async (): Promise<Phone[]> => {
        const phonebook = await Phone.find();
        let list: Phone[] = []
        phonebook.forEach((phone: any) => {
            const _phone = tranform(phone)
            if (_phone) {
                list.push(_phone)
            }
        })
        return list
    }
    createOne = async (name: string, number: string): Promise<Phone> => {
        const phone = new Phone({
            name,
            number
        })
        await phone.save();
        const newPhone = tranform(phone);
        if (newPhone) {
            return newPhone
        }
        throw new Error("Phone not created")
    }
    deleteOne = async (id: string): Promise<void> => {
        try {
            await Phone.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Phone not deleted")
        }
    }

    updateOne = async (id: string, name: string, number: string): Promise<void> => {
        try {
            await Phone.findByIdAndUpdate(id, {name, number});
        } catch (error) {
            throw new Error("Phone not updated")
        }
    }
}