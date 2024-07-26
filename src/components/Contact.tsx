import Loader from './animation/loader'
import { formInputElements } from '../data'
import styled from 'styled-components'
import { theme } from '@/src/constants'
import { useContactAction } from '../hooks'
import { useRef } from 'react'

const ContactSection = styled.section`
	color: ${theme['base-100']};
	height: 100vh;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
`

const Fieldset = styled.fieldset`
	display: flex;
	position: relative;

	& > label {
		transition: all 400ms;
		position: absolute;
		left: 5px;
		transform: translateY(50%);
		pointer-events: none;
	}

	input,
	textarea {
		background: none;
		outline: none;
		border-bottom: 1px solid ${theme['neutral-content']};
		width: 100%;
		resize: none;
		overflow: hidden;
		padding: 0.5rem;
	}

	input:focus + label,
	textarea:focus + label,
	input:not(:placeholder-shown) + label,
	textarea:not(:placeholder-shown) + label {
		transform: translateY(-100%);
		font-size: 0.8rem;
	}
`

const Submit = styled.button`
	position: relative;
	background: #fff;
	color: #000;
	width: 15rem;
	padding: 0.5rem 1rem;
	align-self: end;
	font-weight: bold;
	transition: all 0.3s ease-in-out;
	-webkit-mask: linear-gradient(-45deg, transparent 5%, #fff 5%, #fff 95%, transparent 95%);
	mask: linear-gradient(-45deg, transparent 5%, #fff 5%, #fff 95%, transparent 95%);

	&:hover {
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.95);
	}
`

export default function Contact() {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)

	return (
		<ContactSection id="contact">
			<h2 className="text-6xl">Contact</h2>

			{success ? (
				<h1 className="text-2xl">Your message has been sent!</h1>
			) : (
				<>
					<div className="p-5 w-2/4">
						<div className="border-b-2 pb-5 mb-20">
							<h1 className="text-2xl">Say Hello</h1>
						</div>

						<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-16">
							{formInputElements.map((input, i) => (
								<Fieldset key={i}>
									{input.element === 'input' ? (
										<input
											type={input.type}
											id={input.id}
											name={input.id}
											placeholder=" "
											autoComplete="off"
											maxLength={100}
											required
										/>
									) : (
										<textarea
											ref={textareaRef}
											id={input.id}
											name={input.id}
											value={textareaValue}
											placeholder=" "
											autoComplete="off"
											maxLength={300}
											onChange={e => setTextareaValue(e.target.value)}
											required
										></textarea>
									)}
									<label htmlFor={input.id}>{input.label}</label>
								</Fieldset>
							))}

							<Submit type="submit">Send message</Submit>

							{isSending && <Loader />}
						</form>
					</div>
				</>
			)}
		</ContactSection>
	)
}