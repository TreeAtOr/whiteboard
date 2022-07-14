import { RealtimeChannel, RealtimeSubscription } from "@supabase/realtime-js"
import Board from "../src/supabase/Board"
import { SupabaseRepository } from "../src/supabase/SupabaseRepository"
import { SUPABASE_TEST_KEY, SUPABASE_TEST_URL, TEST_IMAGE_URL, TEST_USER_CREDENTIALS } from "./secret"

describe('Supabase Repository', () => {
    let repo: SupabaseRepository
    it('can bee created', () => {
       // repo = new SupabaseRepository(SUPABASE_TEST_URL, SUPABASE_TEST_KEY)
    })

    describe('User Repository', () => {

        it('should reject incorrect user', async () => {
            const user = await repo.user.signIn('incorrect@newer.ru', '3323232')
            expect(user.error).not.toBeNull()
        })

        it('should reject user with incorrect password', async () => {
            const user = await repo.user.signIn(TEST_USER_CREDENTIALS.email, '3323232')
            expect(user.error).not.toBeNull()
        })

        it('should authorize correct user', async () => {
            const user = await repo.user.signIn(TEST_USER_CREDENTIALS.email, TEST_USER_CREDENTIALS.password)
            expect(user.error).toBeNull()
        })

        it('should get user details', () => {
            const details = repo.user.details
            expect(details).not.toBeNull()
        })

        it('should logout', async () => {
            const error = await repo.user.signOut()
            expect(error.error).toBeNull()
        })

        it('should`t get details when user is logged out', async () => {
            const details = repo.user.details
            expect(details).toBeNull()
        })

    })

    describe('Board Repository', () => {
        beforeAll(async () => {
            await repo.user.signIn(TEST_USER_CREDENTIALS.email, TEST_USER_CREDENTIALS.password)
        })

        it('should list boards', async () => {
            const list = await repo.boards.list()
            expect(list).toBeInstanceOf(Array)
        })

        it('should create board', async () => {
            const board = await repo.boards.create('Test board')
            expect(board).toBeInstanceOf(Board)
        })



        it('should select board', async () => {
            const list = await repo.boards.list()
            if (!list || !list[0]) fail()
            const board = await repo.boards.board(list[0].id)
            expect(board.id).toBe(list[0].id)
            console.dir(board.realtime);

            expect(board.realtime).toBeInstanceOf(RealtimeSubscription)
        })
        describe('Board Entity', () => {
            let board: Board
            beforeAll(async () => {
                const list = await repo.boards.list()
                if (!list || !list[0]) fail()
                board = await repo.boards.board(list[0].id)
            })

            it('should add member to the board', async () => {
                if (!board || !repo.user.details) fail();
                const row = await board.addMember(repo.user.details.id)
                expect(row).not.toBeNull()
            })

            it('should remove member from board', async () => {
                if (!board || !repo.user.details) fail();
                const row = await board.removeMember(repo.user.details.id)
                expect(row).not.toBeNull()
            })

            it('should upload image to board', async () => {
                if (!board) fail();
                const file = await (await fetch(TEST_IMAGE_URL)).blob()
                board.uploadImage('test_img.png', file)
            })

            it('should download image back', async () => {
                if (!board) fail();
                const file = await board.downloadImage('test_img.png')
                expect(file).toBeInstanceOf(Blob)
                expect(file).toEqual(await (await fetch(TEST_IMAGE_URL)).blob())
            })

            it('should add item', () => {

            })

            it('should remove item', () => {

            })

            it('should mutate item', () => {

            })
        })


        it('should delete board', () => {

        })

    })

})
