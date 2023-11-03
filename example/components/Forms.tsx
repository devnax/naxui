import React from "react";
import Form from '../../src/Form'
import Stack from '../../src/Stack'
import Input from '../../src/Input'
import Button from '../../src/Button'
import Radio from '../../src/Radio'
import Checkbox from '../../src/Checkbox'
import LoadingBox from '../../src/LoadingBox'


const Forms = () => {
    return (
        <LoadingBox loading>
            <Form

            >
                <Input name="name" />
                <Radio name="gender" value="male" />
                <Radio name="gender" value="female" />

                <Stack>
                    <Checkbox name="sector" value="A" />
                    <Checkbox name="sector" value="B" />
                    <Checkbox name="sector" value="C" />
                </Stack>
                <select name="item" multiple >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
                <input type="file" name="file" />
                <Stack>
                    <Button type="submit" >Submit</Button>
                </Stack>
            </Form>
        </LoadingBox >
    )
}

export default Forms