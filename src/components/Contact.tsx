import { MotionProps, motion } from 'framer-motion'
import { devices, theme } from '@/src/constants'

import Loader from './animation/loader'
import { SectionTitle } from './ui'
import { formInputElements } from '@/src/data'
import styled from 'styled-components'
import { useContactAction } from '@/src/hooks'
import { useRef } from 'react'

const ContactSection = styled.section`
	color: ${theme['base-100']};
	height: 100vh;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	overflow: hidden;
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

	@media only screen and ${devices.md} {
		& > label {
			transform: translateY(100%);
			left: 0;
		}

		input:focus + label,
		textarea:focus + label,
		input:not(:placeholder-shown) + label,
		textarea:not(:placeholder-shown) + label {
			transform: translateY(-80%);
		}
	}
`

const Submit = styled.button`
	position: relative;
	background: #fff;
	color: #000;
	padding: 0.5rem 2rem;
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

	&:disabled {
		background-color: #afafaf;
		transform: scale(1);
	}

	@media only screen and ${devices.md} {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
	}
`

const motionProps: MotionProps = {
	initial: { opacity: 0, y: '100%' },
	whileInView: { opacity: 1, y: 0 },
	transition: { type: 'tween' },
	viewport: { once: true },
}

export default function Contact() {
	const formRef = useRef<HTMLFormElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const { isSending, success, textareaValue, setTextareaValue, handleSubmit } = useContactAction(
		formRef,
		textareaRef
	)

	return (
		<ContactSection id="contact">
			<SectionTitle title="Contact" />
			{success ? (
				<h1 className="text-2xl">Thanks for reaching out!</h1>
			) : (
				<>
					<motion.div className="p-2 w-2/4 md:w-full" {...motionProps}>
						<div className="border-b-2 pb-5 mb-20 md:mb-16">
							<h1 className="text-2xl md:text-xl">Say Hello</h1>
						</div>

						<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-16 md:gap-10">
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
									<label htmlFor={input.id} className="md:text-[0.8rem]">
										{input.label}
									</label>
								</Fieldset>
							))}

							<Submit type="submit" disabled={isSending}>
								{isSending ? 'Sending...' : 'Send Message'}
							</Submit>

							{isSending && <Loader />}
						</form>
					</motion.div>
				</>
			)}
		</ContactSection>
	)
}
