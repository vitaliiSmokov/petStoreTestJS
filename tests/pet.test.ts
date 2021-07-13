import { strict as assert } from 'assert'
import {PetController} from '../api/controller/pet.controller'

const petController = new PetController();

describe('User can', function () {
    it('receive pet by ID', async function () {

        const body = await petController.getById(1);

        assert(body.id == 1, `Expected 1, but got ${body.id}`);
    });

    it('receive pet by status', async function () {
        
        let body = await petController.findByStatus('available');

        assert(body.length > 0);

        body = await petController.findByStatus('pending');

        assert(body.length > 0);

        body = await petController.findByStatus('sold');

        assert(body.length > 0);

        body = await petController.findByStatus(['pending', 'available']);

        assert(body.length > 0);
        assert(body.some((pet: any) => pet.status == 'available'))
        assert(body.some((pet: any) => pet.status == 'pending'))
        assert(!body.some((pet: any) => pet.status == 'sold'))
    });

    it('receive pet by tag', async function () {

        const body = await petController.findByTags('tag1');

        assert(body.length > 0);
        assert(body.every(
            (pet: any) => pet.tags.some(
                (tag: any) => tag.name == 'tag1')
            )
        )
    })
})