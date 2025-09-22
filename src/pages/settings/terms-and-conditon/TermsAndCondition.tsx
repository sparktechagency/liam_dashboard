import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import MenuBar from '../../../components/PagesComponents/Tiptap/MenuBar';
import { useState } from 'react';
import { useCreateUpdatePrivacyMutation } from '../../../redux/features/policy/policyApi';
import { CgSpinnerTwo } from 'react-icons/cg';

// define your extension array
const extensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc ml-2'
            },
        },
    }),
    Highlight.configure({
        HTMLAttributes: {
            class: 'my-custom-class',
        },
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    })

]


const TermsAndCondition = () => {
    const [content, setContent] = useState("");
    const [createUpdatePricacy, {isLoading}] = useCreateUpdatePrivacyMutation()

    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'min-h-[400px] rounded-md bg-slate-50 py-2 px-3',
            }
        },
        onUpdate: ({ editor }) => {
            // const json = editor.getJSON()
            setContent(editor.getHTML());
            console.log(editor.getHTML())
        }
    })


    const handleClick = () => {
        createUpdatePricacy({
            description: content
        })
    }



    return (
        <div className='min-h-[100vh]'>
            <div className=' flex justify-between items-center'>
                <h1 className="text-2xl mb-3">Terms And Condition</h1>
                <MenuBar editor={editor} />
            </div>

            <EditorContent editor={editor} />
            <div className="flex justify-center items-center">
                <button onClick={handleClick} disabled={isLoading} className="bg-primary w-80 flex justify-center items-center gap-x-2 bg-primaryColor cursor-pointer  mt-10 mb-16 disabled:cursor-not-allowed text-white px-18 rounded-lg py-[6px] text-lg">
                {isLoading ? (
                    <>
                        <CgSpinnerTwo className="animate-spin" fontSize={16} />
                        Processing...
                    </>
                ) : (
                    <>
                        Save Change
                    </>
                )}
            </button>
            </div>
        </div>
    );
};

export default TermsAndCondition;