<template>
    <div class="container">
        <HeadingComponent title="New Account" />
        <div class="card">
            <Form name="signup-form" @submit="handleSubmit">

                <p>Enter your details below to register a new account.</p>
                <hr>

                <label for="firstName"><b>First Name:</b></label>
                <p class='error-message'><ErrorMessage name="firstName" /></p>
                <Field v-model="user.firstName" type="text" placeholder="Enter first name" name="firstName" rules="required|valid-name" />

                <label for="lastName"><b>Last Name:</b></label>
                <p class='error-message'><ErrorMessage name="lastName" /></p>
                <Field v-model="user.lastName" type="text" placeholder="Enter last name" name="lastName" rules="required|valid-name" />

                <label for="email"><b>Email</b></label>
                <p class='error-message'><ErrorMessage name="email" /></p>
                <Field v-model="user.email" type="email" placeholder="Enter email" name="email" rules="required|valid-email" />

                <label for="password"><b>Password:</b></label>
                <p class="password-prompt">Password must be at least 8 characters and requires 1 of each of the following: uppercase letter, lowercase letter, number.</p>
                <p class='error-message'><ErrorMessage name="password" /></p>
                <Field v-model="user.password" type="password" placeholder="Enter password" name="password" id="password" rules="required|valid-password|min:8"/>

                <label for="passwordConfirmation"><b>Confirm Password:</b></label>
                <p class='error-message'><ErrorMessage name="passwordConfirmation" /></p>
                <Field type="password" placeholder="Repeat password" name="passwordConfirmation" id="passwordConfirmation" rules="required|confirmed:@password"/>

                <button type="button" class="cancel-button" v-on:click="back">Cancel</button>
                <button type="submit" class="signup-submit" v-on:click="signup">Sign Up</button>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeadingComponent from '@/components/HeadingComponent.vue';
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';

defineRule("required", (value) => {
    if (!value) {
      return "This field is required";
    }

    return true;
});

defineRule("min", (value, [min]) => {
    if (value && value.length < min) {
        return `Should be at least ${min} characters`;
    }

    return true;
});

defineRule("confirmed", (value, [other]) => {
    if (value !== other) {
      return `Passwords do not match`;
    }

    return true;
});

defineRule("valid-name", (value) => {
    const regex = /^[A-Z]+[A-Z -]?[A-Z]+$/i;
    if (!regex.test(value)) {
        return 'Names can only use letters, - and spaces. Names should not begin or end with a space.';
    }

    return true;
});

defineRule("valid-email", (value) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return 'This field must be a valid email';
    }

    return true;
});

defineRule("valid-password", (value) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.).*$/;
    if (!regex.test(value)) {
        return 'Input a password following the above rules';
    }

    return true;
});

export default ({
    name: 'SignUpView',
    data () {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    components: {
        HeadingComponent,
        Form,
        Field,
        ErrorMessage
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        back() {
            this.$router.push('/');
        },
        ...mapActions('account', ['register']),
        handleSubmit() {
            this.submitted = true;
            this.register(this.user);
        }
    }
})
</script>

<style scoped>
    .container {
        width: 90vw;
        margin: 5%;
        text-align: center;
    }

    .card {
        text-align: left;
        max-width: 600px;
        display: inline-block;
    }

    input[type=text], input[type=email], input[type=password] {
        width: 80%;
        padding: 10px;
        margin: 2% 10%;
        display: inline-block;
        border: var(--color--charcoal) solid 1px;
        font-family: var(--font--base);
        font-size: .9em;
    }

    input[type=text]:focus, input[type=email]:focus, input[type=password]:focus {
        outline: var(--color--charcoal) solid 2px;
    }

    label {
        font-family: var(--font--base);
        font-weight: var(--font--normal);
        font-size: 1em;
        margin-left: 15px;
    }

    button {
        border: none;
        background-color: var(--color--primary);
        padding: 10px 25px;
        margin: 0 15px;
        font-weight: bold;
        color: var(--color--white);
    }

    button:hover {
        background-color: var(--color--primary-hover);
        text-decoration: underline;
        cursor: pointer;
    }

    p {
        font-family: var(--font--base);
        font-weight: var(--font--normal);
        font-size: .9em;
        margin: 5px 5px 15px 5px;
    }

    .password-prompt, .error-message {
        font-size: .8em;
        padding-left: 20px;
        margin: 0;
    }
    .error-message {
        color: rgb(219, 26, 26);
    }
    @media only screen and (max-width: 600px) {
        .container {
        width: 90%;
        margin: 5%;
    }
}
</style>
