<template>
    <div v-for="(reply, i) in replies" :key="i" class="reply">
        <div class="reply-header">
            <strong>{{ reply.user_name }} </strong><span class="text-secondary"> reply to {{ commentUserName }}-
            </span>
            -- {{ reply.created_at }}
        </div>
        <div class="reply-body">
            {{ reply.reply }}
            <!-- user_id,user_name,comment_id,comment -->
            <p><a href="#" @click.prevent="replyTo(reply.user_name, commentId, reply.reply, reply.id)"
                    class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">reply</a>
                <a v-if="reply.user_id==id" href="#" @click.prevent="deleteReply(reply.id)"
                    class="link-danger ms-1 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">delete</a>
            </p>
             <reply-comment
            :replies="reply.replies"
            :commentUserName="reply.user_name"
            :commentId="commentId"
            :replyTo="replyTo"
            :deleteReply="deleteReply"
            />
        </div>
    </div>
</template>

<script setup>
defineProps(['replies','commentUserName','commentId','replyTo','deleteReply'])
const id=userStore().user.id;
</script>

<style>

</style>



<!-- <div v-for="(rep, i) in reply.replies" :key="i" class="reply">
    <div class="reply-header">
        <strong>{{ rep.user_name }} </strong><span class="text-secondary"> reply to {{ reply.user_name
        }}-
        </span> -- {{ rep.created_at }}
    </div>
    <div class="reply-body">
        {{ rep.reply }}
        <p><a href="#" @click.prevent="replyTo(rep.user_name, commentId, reply.reply, reply.id)"
                class="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">reply</a>
            <a v-if="rep.user_id==id" href="#" @click.prevent="deleteReply(rep.id)"
                class="link-danger ms-1 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">delete</a>
        </p>

    </div>
</div> -->