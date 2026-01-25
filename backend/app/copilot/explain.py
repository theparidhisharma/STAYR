import openai
from .prompts import SYSTEM_PROMPT

def generate_final_explanation(agent_summary):
    prompt = f"""
    The agent evaluated multiple hotel booking options.
    Final Recommendation:
    {agent_summary['recommended_option']}
    Explain why this option is the most stable choice
    under the given constraints. Highlight trade-offs.
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content
