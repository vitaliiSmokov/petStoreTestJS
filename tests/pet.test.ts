import got from 'got'
import {strict as assert} from 'assert'

describe('User can', function(){
    it('receive pet by ID', async function() {
        const response = await got('https://petstore.swagger.io/v2/pet/1')
        const body = JSON.parse(response.body)

        assert(body.id == 1, `Expected 1, but got ${body.id}`)
    })
})