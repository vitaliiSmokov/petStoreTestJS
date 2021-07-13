import got from 'got'
import {strict as assert} from 'assert'
import {URLSearchParams} from 'url'

describe('User can', function(){
    it('receive pet by ID', async function() {
        const response = await got('https://petstore.swagger.io/v2/pet/1');
        const body = JSON.parse(response.body);
        assert(body.id == 1, `Expected 1, but got ${body.id}`);
    });

    it('receive pet by status', async function() {
        let res = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status: 'available' }
        });
        let body = JSON.parse(res.body);
        assert(body.length > 0);

        res = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status: 'pending' }
        });
        body = JSON.parse(res.body);
        assert(body.length > 0);

        res = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: { status: 'sold' }
        });
        body = JSON.parse(res.body);
        assert(body.length > 0);

        res = await got('https://petstore.swagger.io/v2/pet/findByStatus', {
            searchParams: new URLSearchParams({ status: ['pending', 'available']})
        });
        body = JSON.parse(res.body);
        assert(body.length > 0);
        assert(body.some((pet: any) => pet.status == 'available'))
        assert(body.some((pet: any) => pet.status == 'pending'))
        assert(!body.some((pet: any) => pet.status == 'sold'))
    });

    it('receive pet by tag', async function() {

    })
})